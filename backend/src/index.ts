import express from 'express';
import cors from 'cors';
import { mainRouter } from './apis/apis';
import { HotelsProviderRegistry } from './services/HotelsProvidersServices/HotelsProviderRegistry';
import { ProviderAService } from './services/HotelsProvidersServices/ProviderAService';

const app = express();
const port = 5000;
export const hotelsProviderRegistry = new HotelsProviderRegistry();
hotelsProviderRegistry.addProvider(new ProviderAService());

app.use(cors());
app.use(express.json());

app.use('/', mainRouter)

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
