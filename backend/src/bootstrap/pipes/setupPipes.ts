import {INestApplication, ValidationPipe} from '@nestjs/common';

export const setupPipes = (app: INestApplication): void => {
    app.useGlobalPipes(createValidationPipe());
};

const createValidationPipe = () => {
    return new ValidationPipe();
}