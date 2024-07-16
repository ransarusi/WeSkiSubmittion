import { Router } from "express";
import { hotelsProviderRegistry } from "..";
import { ISearchInput } from "../models/ISearchInput";
import { Accommodation, IHotelsProviderSearchResponse } from "../models/IHotelsProviderResponse";
import { range } from "lodash";
import { MAX_NUMBER_OF_PERSONS } from "../constants";

export const searchRouter = Router();

searchRouter.get("/", (req, res) => {
	if (!req.query) {
		res.status(400).send('Invalid query parameters');
		return;
	}
	const requestQuery: ISearchInput = req.query as any as ISearchInput;
	const numberOfPeople: number = parseInt(requestQuery.group_size.toString());
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Connection', 'keep-alive');
	const groupSizes = range(numberOfPeople, MAX_NUMBER_OF_PERSONS + 1);
	const sendEvent = (groupSize: number, rooms: Accommodation[]) => {
		const event = {
			groupSize,
			rooms
		};
		res.write(`data: ${JSON.stringify(event)}\n\n`);
	};

	const sendError = (error: {}) => {
		res.write(`event: error\ndata: ${JSON.stringify({ error })}\n\n`);
	};

	const fetchAllRooms = async () => {
		await Promise.all(groupSizes.map(async (groupSize) => {
			try {
				const rooms = await hotelsProviderRegistry.fetchHotelsFromAllProviders({
					...requestQuery,
					group_size: groupSize
				});
				if (rooms) {
					sendEvent(groupSize, rooms);
				}
			} catch (err) {
				sendError(`An error occurred while fetching rooms for group size ${groupSize}.`);
			}
		}));
		res.end();
	};

	fetchAllRooms().catch(() => {
		sendError('An error occurred while fetching rooms.');
		res.end();
	});
});