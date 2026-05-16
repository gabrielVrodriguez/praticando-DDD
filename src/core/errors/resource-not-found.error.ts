
import type { UseCaseError } from "@/core/errors/use-case-interface.error";

export class ResourceNotFoundError extends Error implements UseCaseError {

    constructor() {
        super("Resource not found");
    }
}   