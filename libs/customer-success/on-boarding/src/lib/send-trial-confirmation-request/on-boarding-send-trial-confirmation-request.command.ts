import { command, Command } from '@ebd-connect/cqrs-framework';

@command('OnBoardingSendTrialConfirmationRequest')
export class OnBoardingSendTrialConfirmationRequest implements Command {
  constructor(
    public readonly onBoardingId : string,
    public readonly email : string,
  ) {}
}
