import { PrismaClient } from "@prisma/client";
import { ILogbookRepository } from "../application/ILogbookRepository";
import { Logbook } from "../domain/Logbook";


export class PrismaLogbookRepository implements ILogbookRepository {

    constructor(private readonly _client: PrismaClient){}

    public async save(logbook: Logbook): Promise<boolean> {
        await this._client.logbook.create({
            data: {
                id: logbook.id,
                name: logbook.name,
                userId: logbook.userId
            }
        })

        return true
    }
}