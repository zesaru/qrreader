import { type Database } from './database'

type ContactEntity = Database['public']['Tables']['contacts']['Row']

export type Contact = ContactEntity