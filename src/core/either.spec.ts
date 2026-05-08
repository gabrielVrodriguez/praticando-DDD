import { left, right, type Either } from "./either"

function doSomething(shouldSuccess: boolean): Either<string, number> {
    if (shouldSuccess) {
        return right(42);
    } else {
        return left("Error");
    }
}

test('success result', () => {
    const result = doSomething(true);

    if (result.isRight()) {
        console.log(result.value); // "Success"
    }

    expect(result.isRight()).toEqual(true);
    expect(result.isLeft()).toEqual(false);
});

test('error result', () => {
    const result = doSomething(false);

    expect(result.isRight()).toEqual(false);
    expect(result.isLeft()).toEqual(true);
});