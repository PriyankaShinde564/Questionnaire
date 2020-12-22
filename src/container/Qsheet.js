import React from "react";
import "./qsheet.css";

export default class Qsheet extends React.Component {
  state = {
    originalData: [], //question,category,answers,difficultyLevels
  };

  componentDidMount() {
    fetch("https://opentdb.com/api.php?amount=30&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        const qArray = data.results.map((q) => ({
          question: q.question,
          category: q.category,
          answers: [...q.incorrect_answers, q.correct_answer],
          difficultyLevels: q.difficulty,
        }));
        this.setState({ originalData: qArray });
      });
  }
  renderQuestions = (originalData) => {
    return originalData.map((q, index) => (
      <>
        <div className="sheet">
          <h4> Category: {q.category}</h4>
          <li id="list-Q">{`${index + 1}. ${q.question}`}</li>
          <ol>
            <li>{q.answers[0]}</li>
            <li>{q.answers[1]}</li>
            <li>{q.answers[2]}</li>
            <li>{q.answers[3]}</li>
          </ol>
          {/* <form>
            <input type="radio" />
            <label>{q.answers[0]}</label>
            <br />
            <input type="radio" />
            <label>{q.answers[1]}</label>
            <br />
            <input type="radio" />
            <label>{q.answers[2]}</label>
            <br />
            <input type="radio" />
            <label>{q.answers[3]}</label>
            <br />
          </form> */}
        </div>
      </>
    ));
  };

  render() {
    return (
      <>
        <div className="header">
          <h1>Questionnaire</h1>
          Difficulty Level:{" "}
          <select>
            <option value={this.state.originalData.difficultyLevels == "easy"}>
              Easy
            </option>
            <option value={this.state.originalData.difficultyLevels == "hard"}>
              Hard
            </option>
            <option
              value={this.state.originalData.difficultyLevels == "medium"}
            >
              Medium
            </option>
          </select>
        </div>
        <hr />
        {this.renderQuestions(this.state.originalData)}
      </>
    );
  }
}
