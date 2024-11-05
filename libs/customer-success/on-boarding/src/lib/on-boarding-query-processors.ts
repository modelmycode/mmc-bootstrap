import { onBoardingTrialConfirmedViewQueryDb } from '../index'
import {
  OnBoardingTrialConfirmedViewQueryHandler,
  OnBoardingTrialConfirmedViewQueryProjector
} from './trial-confirmed-view/on-boarding-trial-confirmed-view.query';
import { Type } from '@ebd-connect/cqrs-framework';

export const onBoardingQueryProcessors = [
  OnBoardingTrialConfirmedViewQueryProjector, //
  //processors
]
export const onBoardingQueryHandlers: Type[] = [
  OnBoardingTrialConfirmedViewQueryHandler, //
  //processors
]
export const onBoardingQueryDb = [
  onBoardingTrialConfirmedViewQueryDb, //
  //queryDb
]
