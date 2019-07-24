// @flow
import EntUser from '../schemas/EntUserSchema';

export type ViewerContext = {|
  +currentUser: ?EntUser,
|};
