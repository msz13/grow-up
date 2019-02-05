exports.id = "main";
exports.modules = {

/***/ "./src/competence-goal/competence-goal.resolver.ts":
/*!*********************************************************!*\
  !*** ./src/competence-goal/competence-goal.resolver.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst graphql_1 = __webpack_require__(/*! @nestjs/graphql */ \"@nestjs/graphql\");\r\nconst graphql_schema_1 = __webpack_require__(/*! ../common/graphql.schema */ \"./src/common/graphql.schema.ts\");\r\nconst competence_goal_service_1 = __webpack_require__(/*! ./services/competence-goal.service */ \"./src/competence-goal/services/competence-goal.service.ts\");\r\nconst competence_goal_input_1 = __webpack_require__(/*! ./DTO/competence-goal-input */ \"./src/competence-goal/DTO/competence-goal-input.ts\");\r\nlet CompetenceGoalResolvers = class CompetenceGoalResolvers {\r\n    constructor(competenceGoalService) {\r\n        this.competenceGoalService = competenceGoalService;\r\n    }\r\n    competenceGoals(status, competence) {\r\n        if (status === graphql_schema_1.GoalStatus.ACTIVE) {\r\n            return this.competenceGoalService.findActive(competence);\r\n        }\r\n        else\r\n            return null;\r\n    }\r\n    createCompGoal(args) {\r\n        return this.competenceGoalService.create(args);\r\n    }\r\n};\r\n__decorate([\r\n    graphql_1.Query(),\r\n    __param(0, graphql_1.Args(\"status\")), __param(1, graphql_1.Args(\"competence\")),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [String, String]),\r\n    __metadata(\"design:returntype\", Object)\r\n], CompetenceGoalResolvers.prototype, \"competenceGoals\", null);\r\n__decorate([\r\n    graphql_1.Mutation(),\r\n    __param(0, graphql_1.Args('competenceGoalInput')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [competence_goal_input_1.CreateCompetenceGoalInput]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], CompetenceGoalResolvers.prototype, \"createCompGoal\", null);\r\nCompetenceGoalResolvers = __decorate([\r\n    graphql_1.Resolver('CompetenceGoal'),\r\n    __metadata(\"design:paramtypes\", [competence_goal_service_1.CompetenceGoalService])\r\n], CompetenceGoalResolvers);\r\nexports.CompetenceGoalResolvers = CompetenceGoalResolvers;\r\n\n\n//# sourceURL=webpack:///./src/competence-goal/competence-goal.resolver.ts?");

/***/ }),

/***/ "date-fns/format":
false

};