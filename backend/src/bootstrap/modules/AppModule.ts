import {Module} from '@nestjs/common';
import {UsersModule} from "../../domains/users/UsersModule";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forRoot()
    ],
})
export class AppModule {
}
