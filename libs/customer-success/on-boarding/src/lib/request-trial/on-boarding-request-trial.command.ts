import { command, RespondingCommand } from '@ebd-connect/cqrs-framework';

@command('OnBoardingRequestTrial')
export class OnBoardingRequestTrial implements RespondingCommand {
  constructor(
    public readonly onBoardingId : string,
    public readonly email : string,
    public readonly firstName : string,
    public readonly lastName : string,
  ) {}
  $responseType!: { onBoardingId : string }}
