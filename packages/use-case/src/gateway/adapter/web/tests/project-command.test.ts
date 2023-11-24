import { CreateProjectWebCommand } from '../project-command';
import {ProjectName} from "@panda-project/core";

describe('CreateProjectWebCommand', () => {
  test('getProjectName', () => {
    const sut = new CreateProjectWebCommand('プロジェクト');
    expect(sut.getProjectName()).toEqual(new ProjectName('プロジェクト'));
  });
})
