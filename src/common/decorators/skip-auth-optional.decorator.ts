import { SetMetadata } from "@nestjs/common";

export const SKIP_AUTH_OPTIONAL_KEY = "skipAuthOptional";
export const SkipAuthOptional = () => SetMetadata(SKIP_AUTH_OPTIONAL_KEY, true);
