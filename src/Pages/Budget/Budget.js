import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import { apiGet, apiPost } from '../../Functions/api'
import Progress from '../../Components/Progress';
import Modal from '../../Components/Modal';
import TransactionTable from './TransactionTable';

import './_pillar.budget.source.scss';

const propTypes = {
  budget: PropTypes.object,
}

const defaultProps = {
  budget: {
    name: '',
    id: 0,
    total: 0,
    spent: 0,
    transactions: []
  }
}

class Budget extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      budget: {
        _id: '',
        budgetLimit: 0,
        budgetName: "",
        currentAmount: 0,
      },
      deleted: false,
      editBudgetModal: false,
      limit: this.props.budget.total,
      formattedLimit: this.props.budget.total,
      transactions: [],
    }

    this.onDelete = this.onDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    apiGet(`/budget/${id}`).then( response => {
      if (!response.success) {
        const message = response.message || 'Problem getting budget';
        console.error(message);
      }

      this.setState({budget: {...response.budgets}});
    })

    this.updateTransactions();
  }

  updateTransactions() {
    apiGet(`/transactions`).then( response => {
      this.setState({transactions: response.transactions});
    })
  }

  onDelete() {
    apiPost('/budget/delete', {budgetID: this.state.budget._id}).then(response => {
      if (!response.success) {
        const message = response.message || 'Problem getting budget';
        console.error(message);
      }
      this.setState({deleted: true})
    });
  }

  showModal() {
    this.setState({editBudgetModal: true});
  }

  hideModal() {
    this.setState({editBudgetModal: false});
  }

  updateBudget() {
    const budget = {
      newBudgetName: this.state.budget.budgetName,
      newBudgetLimit: this.state.budget.budgetLimit,
      budgetID: this.state.budget._id
    }

    apiPost('/budget/edit', budget).then(response => {
      if (!response.success) {
        const message = response.message || 'Problem getting budget';
        console.error(message);
      }

      this.setState({
        budget: {
          ...this.state.budget,
          budgetName: budget.newBudgetName,
          budgetLimit: budget.newBudgetLimit
        },
        editBudgetModal: false
      });
    })
  }

  render() {
    const { budget, transactions } = this.state;
    if (this.state.deleted) return <Redirect to="/dashboard" />;

    return (
      <div className="p-budget">
        <div className="p-budget__content">
          <div className="p-budget__title_bar">
            <div className="p-budget__title">{budget.budgetName}</div>
            <i className="fa fa-cog p-budget__settings_icon" onClick={this.showModal}></i>
          </div>
          <Progress spent={budget.currentAmount} total={budget.budgetLimit} />
          <div className="p-budget__transactions c-card">
            <div className="c-card_header">Transactions</div>

            <TransactionTable transactions={transactions} updateTransactions={this.updateTransactions}/>
          </div>
        </div>
        <Modal title="Edit Budget" isShowing={this.state.editBudgetModal} closeModal={this.hideModal}>
          <input
            type="text"
            placeholder="Name"
            defaultValue={this.state.budget.budgetName}
            onChange={(e) => {this.setState({budget: {...this.state.budget, budgetName: e.target.value}})}}
            ref="budget_name" />
          <NumberFormat
            value={this.state.budget.budgetLimit}
            decimalScale={2}
            thousandSeparator={true}
            prefix={'$'}
            onValueChange={(values) => {
              const {formattedValue, value} = values;
              this.setState({budget: {...this.state.budget, budgetLimit: parseFloat(value)}, limit: value, formattedLimit: formattedValue})
          }}/>
          <div className="p-budget__edit_modal_actions">
            <button onClick={this.updateBudget}>Save</button>
            <div className="c-error_text p-budget__delete" onClick={this.onDelete}>Delete Budget</div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => ({
});

Budget.propTypes = propTypes;
Budget.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Budget)
