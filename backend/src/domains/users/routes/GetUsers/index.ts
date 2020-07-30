import {Controller, Get, Query} from "@nestjs/common";
import {Parameters} from "./Parameters";

@Controller()
export class GetUsers {
    @Get('/users')
    serve(@Query() params: Parameters): string[] {
        return Array(params.amount).fill(params.name);
    }
}
