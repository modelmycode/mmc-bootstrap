import {
  eventHandler,
  query,
  Query,
  QueryDatabaseModel,
  queryHandler,
} from '@ebd-connect/cqrs-framework';
import {
  OnBoardingTrialConfirmationRequestSent,
  OnBoardingTrialRequested,
} from '../..';

export interface IOnBoardingTrialConfirmedView {
  onBoardingId: string;
  email: string;
  firstName: string;
  lastName: string;
}

@query('OnBoardingTrialConfirmedView')
export class OnBoardingTrialConfirmedView implements Query {
  $responseType!: IOnBoardingTrialConfirmedView | null
  constructor(
    public readonly onBoardingId : string,
    public readonly email : string,
    public readonly firstName : string,
    public readonly lastName : string,
) {}
}

export const onBoardingTrialConfirmedViewQueryDb
  = new QueryDatabaseModel< IOnBoardingTrialConfirmedView >('on-boarding-trial-confirmed-view')


export class OnBoardingTrialConfirmedViewQueryHandler {
@queryHandler({ name:'OnBoardingTrialConfirmedView'})
  async onBoardingTrialConfirmedView(){
    return onBoardingTrialConfirmedViewQueryDb.raw(`SELECT data FROM "${onBoardingTrialConfirmedViewQueryDb.tableName}"`)
  }
}

export class OnBoardingTrialConfirmedViewQueryProjector {
  @eventHandler({name:'OnBoardingTrialConfirmationRequestSent'})
  async onOnBoardingTrialConfirmationRequestSent({onBoardingId: id,...data}: OnBoardingTrialConfirmationRequestSent) {
    await onBoardingTrialConfirmedViewQueryDb.patch(id, {onBoardingId: id, ...data})
  }
  @eventHandler({name:'OnBoardingTrialRequested'})
  async onOnBoardingTrialRequested({onBoardingId: id,...data}: OnBoardingTrialRequested) {
    await onBoardingTrialConfirmedViewQueryDb.create(id, {onBoardingId: id, ...data})
  }
}
