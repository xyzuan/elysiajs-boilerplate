import Elysia from "elysia";
import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  ImATeapotException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  NotImplementedException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@constants/exceptions";
import { logger } from "@bogeychan/elysia-logger";
import { opentelemetry } from "@elysiajs/opentelemetry";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";

/**
 * 400 - Bad Request
 * BadRequestException
 *
 * 401 - Unauthorized
 * UnauthorizedException
 *
 * 403 - Forbidden
 * ForbiddenException
 *
 * 404 - Not Found
 * NotFoundException
 *
 * 405 - Method Not Allowed
 * MethodNotAllowedException
 *
 * 409 - Conflict
 * ConflictException
 *
 * 418 - I'm a teapot
 * ImATeapotException
 *
 * 500 - Internal Server Error
 * InternalServerErrorException
 *
 * 501 - Not Implemented
 * NotImplementedException
 *
 * 502 - Bad Gateway
 * BadGatewayException
 *
 * 503 - Service Unavailable
 * ServiceUnavailableException
 */

const error = new Elysia()
  .use(logger({}))
  .use(
    opentelemetry({
      spanProcessors: [
        new BatchSpanProcessor(
          new OTLPTraceExporter({
            url: "https://api.axiom.co/v1/traces",
            headers: {
              Authorization: `Bearer ${Bun.env.AXIOM_SECRET_TOKEN as string}`,
              "X-Axiom-Dataset": Bun.env.AXIOM_DATASET as string,
            },
          })
        ),
      ],
    })
  )
  .error({
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ImATeapotException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    NotImplementedException,
    ServiceUnavailableException,
    UnauthorizedException,
  })
  .onError({ as: "global" }, (ctx) => {
    const { code, error } = ctx;

    switch (code) {
      case "NOT_FOUND":
        return new NotFoundException();
      case "INTERNAL_SERVER_ERROR":
        return new InternalServerErrorException();
      default:
        return error;
    }
  });

export { error };
