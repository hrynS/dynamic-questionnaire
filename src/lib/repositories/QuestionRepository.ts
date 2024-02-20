import * as fs from 'fs/promises';
import path from 'node:path';

class QuestionRepository {
  context: string;

  constructor() {
    if (process.env.DATA_STORAGE_PATH) {
      this.context = path.join(process.cwd(), process.env.DATA_STORAGE_PATH);
    } else {
      throw new Error(
        'Please provide the environmental variable DATA_STORAGE_PATH',
      );
    }
  }

  async getAll() {
    try {
      return await this.loadJsonFile(this.context);
    } catch {
      throw new Error('An error occured while getting the questions');
    }
  }

  async getById(id: string) {
    try {
      const questions = await this.loadJsonFile(this.context);
      return questions[id];
    } catch {
      throw new Error(
        `An error occured while getting the question with id ${id}`,
      );
    }
  }

  async loadJsonFile(filePath: string) {
    try {
      const jsonData = await fs.readFile(
        path.resolve(process.cwd(), filePath),
        'utf-8',
      );
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('Failed to read JSON file:', error);
      throw error;
    }
  }
}

const QuestionRepositoryInstance = new QuestionRepository();

export default QuestionRepositoryInstance;
