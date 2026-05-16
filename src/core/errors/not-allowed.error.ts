import type { UseCaseError } from "@/core/errors/use-case-interface.error";


export class NotAllowedError extends Error implements UseCaseError {

    constructor() {
        super("Not allowed");
    }
}