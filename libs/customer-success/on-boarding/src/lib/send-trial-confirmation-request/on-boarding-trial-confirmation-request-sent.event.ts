import { Event } from '@ebd-connect/cqrs-framework';

export class OnBoardingTrialConfirmationRequestSent implements Event {
  constructor(
    public readonly onBoardingId : string,
    public readonly email : string,
  ) {}
}
