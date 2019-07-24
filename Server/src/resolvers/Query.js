// @flow
import type {ViewerContext} from '../types/ViewerContext';
import EntUser from '../schemas/EntUserSchema';
type ViewerVariables = {||};

export default {
  viewer: (
    parent: null,
    args: ViewerVariables,
    context: ViewerContext
  ): ?EntUser => {
    return context.currentUser;
  },
};
