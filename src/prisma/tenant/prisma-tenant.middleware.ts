import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class PrismaTenantMiddleware implements NestMiddleware {

    use(req: any, res: any, next: () => void) {

        // const tenantId = req.headers['x-tenant-id']

        req.sampleFromReq = "sampleFromReq.value"; 

        next()
    }
}