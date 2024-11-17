import { HttpException } from "./http.exception.js";

export class InternalServerErrorException extends HttpException{
    constructor(message){
        super(500,message);
        this.name = "InternalServerException"
    }
}