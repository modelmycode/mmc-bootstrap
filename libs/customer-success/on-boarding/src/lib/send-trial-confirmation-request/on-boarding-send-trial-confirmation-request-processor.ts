import { Processor, automationFactory, eventHandler,messageBus,} from "@ebd-connect/cqrs-framework"
import {OnBoardingTrialRequested,OnBoardingTrialConfirmationRequestSent,OnBoardingSendTrialConfirmationRequest} from '../..';

interface TrialConfirmationRequestSentView {
  onBoardingId?: string,  email?: string,}

export class OnBoardingSendTrialConfirmationRequestProcessor
implements Processor<TrialConfirmationRequestSentView>
{
  private readonly automation = automationFactory.forProcessor(this)

  async process(data: TrialConfirmationRequestSentView): Promise<void> {
    if ( data.onBoardingId&&  data.email)
      await messageBus.execute(new OnBoardingSendTrialConfirmationRequest(
        data.onBoardingId,      data.email,
      ))
  }

  @eventHandler({name: 'OnBoardingTrialRequested'})
  async onTrialRequested(event: OnBoardingTrialRequested) {
  await this.automation.add(event.onBoardingId, {
  onBoardingId: event.onBoardingId,  email: event.email,
  })
  }
  @eventHandler({name: 'OnBoardingTrialConfirmationRequestSent'})
  async onTrialConfirmationRequestSent(event: OnBoardingTrialConfirmationRequestSent) {
  await this.automation.onComplete(event.onBoardingId)
  }
}
