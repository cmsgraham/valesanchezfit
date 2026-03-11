'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serverFunction = async function serverFunction(args: any): Promise<any> {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}
