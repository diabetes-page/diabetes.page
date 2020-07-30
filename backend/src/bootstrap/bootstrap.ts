import {NestFactory} from "@nestjs/core";
import {AppModule} from "./modules/AppModule";
import {addValidationPipe} from "./addValidationPipe";

export async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    addValidationPipe(app);
    await app.listen(3000);
}
