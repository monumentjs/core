import {RuntimeID} from './RuntimeID';


export interface IRuntimeRestrictions {
    allow?: RuntimeID[];
    disallow?: RuntimeID[];
}
