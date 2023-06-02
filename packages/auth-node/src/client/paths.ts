import { GetUserOptions } from "./requests";
import { GetUser200Response } from "./responses";
export interface Routes {
    "/users/{userId}": {
        get: (input: GetUserOptions) => Promise<GetUser200Response>;
    };
}

/**
 * Helper type that matches a string with a Template
 * we use this to figure out if a string contains
 * one or more path parameters. Path parameters
 * are segments of the path that start with '/' and
 * are enclosed by '{}'
 */
export type PathParameter<TPath extends string> =
    // Define our template in terms of Head/{Parameter}Tail
    TPath extends `${infer Head}/{${infer Parameter}}${infer Tail}`
        ? // We can call PathParameter<Tail> recursively to
          // match the template against the Tail of the path
          [pathParameter: string, ...params: PathParameter<Tail>]
        : // If no parameters were found we get an empty tuple
          [];

/**
 * Defines the type for the path function that will be part
 * of the client. This will only accept a string that
 * matches any of the keys of our Routes interface
 */
export type Path = <TPath extends keyof Routes>(
    path: TPath,
    // Our PathParameter helper type gives us a tuple
    // of the parameters that were found. If we spread
    // the tuple, we get each single parameter as a positiona
    // parameter of this function
    ...pathParam: PathParameter<TPath>
) => Routes[TPath]; // We can access elements of an interface by key
