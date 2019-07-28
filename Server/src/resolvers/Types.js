// @flow
import EntUser from '../schemas/EntUserSchema';

export default {
  User: {
    id: (parent: EntUser): string => parent.getID(),
    username: (parent: EntUser): string => parent.getUsername(),
    authToken: (parent: EntUser): string => parent.getAuthToken(),
  },
};
