import { Event } from '@ebd-connect/cqrs-framework';

export class OnBoardingTrialRequested implements Event {
  constructor(
    public readonly onBoardingId : string,
    public readonly email : string,
    public readonly firstName : string,
    public readonly lastName : string,
  ) {}
}
