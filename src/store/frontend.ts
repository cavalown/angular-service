import { CQRS, Main, RelationshipFromJDL } from 'mycena-store';
import { CommonFeatureKeys, CommonReducers, CommonStoreState } from './index';

export type EntityName = 'todos'

export interface StoreState extends CommonStoreState { }

export const Reducers = {
  ...CommonReducers
};

export const FeatureKeys = {
  ...CommonFeatureKeys
};

// export const RelationshipByTypeMap: RelationshipFromJDL = {
//   ...CommonRelationshipByType
// };

export const Cqrs = new CQRS<StoreState, typeof Reducers>();
// Cqrs.setAppModuleType('angular');
Cqrs.forRootReducers(Reducers);
// Cqrs.seRelationshipFromJDL(RelationshipByTypeMap);

export const Store = Cqrs.Store;
export const StoreSate = Store.state;
export const RelationStore = Store.withRelation$;
export const RelationStoreState = Store.withRelation;
export const Actions: any = Cqrs.Actions;
Main.printMode = 'none';
