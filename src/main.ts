import { PrismaClient } from "@prisma/client"
import { CreateLogbookUseCase } from "./application/CreateLogbookUseCase"
import { InMemoryLogbookRepository } from "./infrastructure/InMemoryLogbookRepository"
import { ApiServer } from "./presentation/ApiServer"
import { CreateLogbookController } from "./presentation/CreateLogbookController"
import { PrismaLogbookRepository } from "./infrastructure/PrismaLogbookRepository"


export async function main(): Promise<void> {
    const client = new PrismaClient()
    const prismaRepo = new PrismaLogbookRepository(client)
    const inMemoryRepo = new InMemoryLogbookRepository()
    const useCase = new CreateLogbookUseCase(prismaRepo)
    const controller = new CreateLogbookController(useCase)

    await ApiServer.run(5000, controller)
}

main()