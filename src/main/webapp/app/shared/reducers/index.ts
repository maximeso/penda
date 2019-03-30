import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import children, {
  ChildrenState
} from 'app/entities/children/children.reducer';
// prettier-ignore
import observation, {
  ObservationState
} from 'app/entities/observation/observation.reducer';
// prettier-ignore
import messageGroup, {
  MessageGroupState
} from 'app/entities/message-group/message-group.reducer';
// prettier-ignore
import messageUser, {
  MessageUserState
} from 'app/entities/message-user/message-user.reducer';
// prettier-ignore
import childrenGroup, {
  ChildrenGroupState
} from 'app/entities/children-group/children-group.reducer';
// prettier-ignore
import eventGroup, {
  EventGroupState
} from 'app/entities/event-group/event-group.reducer';
// prettier-ignore
import recipe, {
  RecipeState
} from 'app/entities/recipe/recipe.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly children: ChildrenState;
  readonly observation: ObservationState;
  readonly messageGroup: MessageGroupState;
  readonly messageUser: MessageUserState;
  readonly childrenGroup: ChildrenGroupState;
  readonly eventGroup: EventGroupState;
  readonly recipe: RecipeState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  children,
  observation,
  messageGroup,
  messageUser,
  childrenGroup,
  eventGroup,
  recipe,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
