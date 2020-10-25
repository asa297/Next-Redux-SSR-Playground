import { useSelector } from 'react-redux'
import * as selectors from './selectors'

export const useExample = () => {
    return {
        states : {
            message : useSelector(selectors.messageSelector)
        }
    }
}