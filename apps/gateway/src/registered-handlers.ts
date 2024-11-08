import { OnBoardingApplicationService, onBoardingAutomationProcessors,
onBoardingQueryProjectors, onBoardingQueryDb,onBoardingQueryHandlers } from '@customer-success-backend/on-boarding'

import { QueryDatabaseModel, Type } from '@ebd-connect/cqrs-framework';

export const commandHandlers: Type[] = [
    OnBoardingApplicationService //
  //
]
export const automationProcessors: Type[] = [
    ...onBoardingAutomationProcessors //
  //
]
export const eventHandlers = [
  //
]
export const queryDatabaseModels: QueryDatabaseModel[] = [
    ...onBoardingQueryDb //
  //
]
export const queryHandlers: Type[]  = [
    ...onBoardingQueryHandlers //
  //
]
export const queryProjectors = [
    ...onBoardingQueryProjectors //
  //
]
