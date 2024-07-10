import { Global, Module } from '@nestjs/common';
import { ErrorThrower } from './errorThrower.service';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [ErrorThrower],
    exports: [ErrorThrower],
})
export class ErrorThrowerModule {}
