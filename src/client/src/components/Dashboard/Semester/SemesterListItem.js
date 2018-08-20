import React, { Component } from 'react';
import {
  Help,
  Field,
  Label,
  PanelBlock,
  Control,
  Input,
  Icon,
  PanelIcon,
  Button,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  Delete,
  ModalCardBody,
  ModalCardFooter
} from 'bloomer';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import _ from 'lodash';

import './semester.css';
import {
  updateSemester,
  removeSemester
} from '../../../redux/actions/semesterActions';
import { clearErrors } from '../../../redux/actions/profileActions';
import Spinner from '../ButtonAltSpinner/ButtonAltSpinner';

class SemesterListItem extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.props.clearErrors();
    this.setState({ errors: {} });
    let value = e.target.value;
    // console.log([e.target.name], value);
    this.setState({ [e.target.name]: value }, () => {
      this.setState({ isAddFormEdited: true });
    });
  }
  handleUpdate = e => {
    e.preventDefault();
    this.setState({ loading: true });
    this.setState({ errors: {} });
    this.props.clearErrors();
    let semester = _.pick(this.state, ['section', 'level', 'superscript']);
    let semesterFinalName = semester.section.toUpperCase();
    // put level & superscript value -1 to omit/ignore
    if (
      semester.level.toString() !== '-1' &&
      parseInt(semester.level, 10) > 0
    ) {
      semesterFinalName += `- ${semester.level}`;
      if (semester.superscript.toString() !== '-1') {
        semesterFinalName += `<sup>${semester.superscript}</sup>`;
      }
    }

    if (semesterFinalName.toString() === this.props.semester.name.toString()) {
      // console.log(semesterFinalName.toString());
      // console.log(this.props.semester.name.toString());
      /* START */
      /* not working have to debug */
      /* 1 */
      // this.setState(prevState => ({
      //   errors: {
      //     ...prevState.errors,
      //     semesterName: '✋ Wait ! I detect that you changed nothing !'
      //   }
      // }));
      /* 2 */
      // let errors = Object.assign({}, this.state.errors); //creating copy of object
      // errors.semesterName = '✋ Wait ! I detect that you changed nothing !'; //updating value
      // this.setState({ errors });
      /* END */
      /* so managing via state */
      this.setState({
        errorMsg: '✋ Wait, I detect that you changed nothing !'
      });
    } else {
      this.props.updateSemester(this.props.semester._id, {
        name: semesterFinalName
      });
    }

    // console.log(this.state.errors);

    setTimeout(() => {
      if (
        _.size(
          // checking errors obj size
          _.pick(this.state.errors, [
            // pick only the actual error not successMsg field that i tricked
            'semesterName'
          ])
        ) === 0 &&
        !this.state.errorMsg // if error obj === 0 then clean else not
      ) {
        this.setState({ section: '' });
        this.setState({ level: '' });
        this.setState({ superscript: '' });
        this.setState({ errors: {} });
        this.props.clearErrors();
        this.setState({ modal: false });
      }
      this.setState({ loading: false });
      this.setState({ errorMsg: '' });
    }, 3000);
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errors: {},
      modal: false,
      section: '',
      level: '',
      superscript: '',
      errorMsg: '',
      deleteBtnLoading: false
    };
    this.onChange = this.onChange.bind(this);
  }
  render() {
    const { errors } = this.state;
    let semester = this.props.semester;
    return (
      <PanelBlock>
        <PanelIcon className="fas fa-book-open" />
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div
            className="semester-name"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(semester.name)
            }}
          />
          <div>
            <Button
              isColor="success"
              isOutlined
              style={{ margin: '0 5px 0 0' }}
              onClick={e => {
                this.props.clearErrors();
                this.setState({ errors: {} });
                this.setState({ modal: true });
              }}
            >
              Edit
            </Button>
            {this.state.deleteBtnLoading ? (
              <Spinner color="#FF3860" />
            ) : (
              <Button
                isColor="danger"
                isOutlined
                onClick={() => {
                  this.setState({ deleteBtnLoading: true });
                  setTimeout(() => {
                    this.props.clearErrors();
                    this.props.removeSemester(semester._id);
                    this.setState({ deleteBtnLoading: false });
                  }, 1000);
                }}
              >
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Update Form Model */}

        <Modal isActive={this.state.modal}>
          <ModalBackground />
          <ModalCard>
            <ModalCardHeader>
              {!this.state.loading ? (
                <ModalCardTitle>
                  Update{' '}
                  <span
                    style={{ fontWeight: 700 }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(semester.name)
                    }}
                  />{' '}
                  to :
                </ModalCardTitle>
              ) : (
                <ModalCardTitle>Please Wait ! Working...</ModalCardTitle>
              )}
              <Delete
                onClick={() => {
                  this.props.clearErrors();
                  this.setState({ errors: {} });
                  this.setState({ modal: false });
                  this.setState({ loading: false });
                  this.setState({ errorMsg: '' });
                  this.setState({ superscript: '' });
                  this.setState({ level: '' });
                  this.setState({ section: '' });
                }}
              />
            </ModalCardHeader>
            <ModalCardBody>
              {/* Content  */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Help
                  style={{ textAlign: 'center', fontWeight: 500 }}
                  isColor="danger"
                >
                  {errors.semesterName}
                  {this.state.errorMsg}
                </Help>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                  }}
                >
                  <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
                    <Label>Section</Label>
                    <Control hasIcons="left">
                      <Input
                        style={{ textTransform: 'uppercase' }}
                        isColor="success"
                        name="section"
                        placeholder="CSE"
                        value={this.state.section}
                        onChange={this.onChange}
                      />
                      <Icon isSize="small" isAlign="left">
                        <span className="fas fa-book-open" aria-hidden="true" />
                      </Icon>
                    </Control>
                  </Field>
                  <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
                    <Label>Level</Label>
                    <Control hasIcons="left">
                      <Input
                        isColor="success"
                        name="level"
                        type="number"
                        placeholder="5"
                        value={this.state.level}
                        onChange={this.onChange}
                      />
                      <Icon isSize="small" isAlign="left">
                        <span
                          className="fas fa-sort-numeric-down"
                          aria-hidden="true"
                        />
                      </Icon>
                    </Control>
                  </Field>
                  <Field style={{ flex: 1, margin: '0 5px 0 0' }}>
                    <Label>Superscript</Label>
                    <Control hasIcons="left">
                      <Input
                        isColor="success"
                        name="superscript"
                        placeholder="th"
                        value={this.state.superscript}
                        onChange={this.onChange}
                      />
                      <Icon isSize="small" isAlign="left">
                        <span
                          className="fas fa-superscript"
                          aria-hidden="true"
                        />
                      </Icon>
                    </Control>
                  </Field>
                </div>
                {(this.state.section ||
                  this.state.level ||
                  this.state.superscript) && (
                  <Help
                    isColor="info"
                    style={{ textAlign: 'center', fontWeight: 500 }}
                  >
                    Example: Section: <strong>CSE</strong> | Level:{' '}
                    <strong>5</strong> | Superscript:{' '}
                    <strong>st/nd/rd/th</strong> etc.
                    <span aria-label="subject" role="img">
                      {' '}
                      😎{' '}
                    </span>
                    N. B. put level & superscript value -1 to omit/ignore
                  </Help>
                )}
              </div>
            </ModalCardBody>
            <ModalCardFooter>
              {this.state.loading ? (
                <div style={{ marginTop: '1.2rem' }}>
                  <Spinner color="#1ECD97" />
                </div>
              ) : (
                <Button
                  isColor="success"
                  onClick={this.handleUpdate}
                  disabled={!this.state.section || !this.state.level}
                >
                  Update
                </Button>
              )}
            </ModalCardFooter>
          </ModalCard>
        </Modal>
      </PanelBlock>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};
export default connect(mapStateToProps, {
  updateSemester,
  removeSemester,
  clearErrors
})(SemesterListItem);
