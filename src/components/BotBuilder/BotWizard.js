import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import colors from '../../Utils/colors';
import Build from './BotBuilderPages/Build';
import Design from './BotBuilderPages/Design';
import Configure from './BotBuilderPages/Configure';
import Deploy from './BotBuilderPages/Deploy';
import { Paper } from 'material-ui';
import './BotBuilder.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class BotWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      themeSettingsString: '{}',
    };
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  updateSettings = themeSettingsString => {
    this.setState({ themeSettingsString });
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Build />;
      case 1:
        return <Design updateSettings={this.updateSettings} />;
      case 2:
        return <Configure />;
      case 3:
        return <Deploy />;
      default:
    }
  }

  setStep = stepIndex => {
    this.setState({ stepIndex });
  };
  render() {
    if (!cookies.get('loggedIn')) {
      return (
        <div>
          <StaticAppBar {...this.props} />
          <div>
            <p style={styles.loggedInError}>
              Please login to create the Web Bot.
            </p>
          </div>
        </div>
      );
    }
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };
    const locationBot =
      '/BotPreview.html?access=' +
      cookies.get('loggedIn') +
      '&type=botWindow' +
      '&themeSettings=' +
      encodeURIComponent(this.state.themeSettingsString);
    return (
      <div>
        <StaticAppBar {...this.props} />
        <div style={styles.home} className="botbuilder-page-wrapper">
          <Paper
            style={styles.paperStyle}
            className="botBuilder-page-card"
            zDepth={1}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '100%', maxWidth: '100%', margin: 'auto' }}>
                <Stepper activeStep={stepIndex} linear={false}>
                  <Step>
                    <StepButton onClick={() => this.setStep(0)}>
                      Build
                    </StepButton>
                  </Step>
                  <Step>
                    <StepButton onClick={() => this.setStep(1)}>
                      Design
                    </StepButton>
                  </Step>
                  <Step>
                    <StepButton onClick={() => this.setStep(2)}>
                      Configure
                    </StepButton>
                  </Step>
                  <Step>
                    <StepButton onClick={() => this.setStep(3)}>
                      Deploy
                    </StepButton>
                  </Step>
                </Stepper>
                <div style={contentStyle}>
                  <div>{this.getStepContent(stepIndex)}</div>
                  <div style={{ marginTop: '20px' }}>
                    <RaisedButton
                      label="Back"
                      disabled={stepIndex === 0}
                      backgroundColor={colors.header}
                      labelColor="#fff"
                      onTouchTap={this.handlePrev}
                      style={{ marginRight: 12 }}
                    />
                    {stepIndex < 3 ? (
                      <RaisedButton
                        label={stepIndex === 2 ? 'Finish' : 'Next'}
                        backgroundColor={colors.header}
                        labelColor="#fff"
                        onTouchTap={this.handleNext}
                      />
                    ) : (
                      <p
                        style={{
                          padding: '20px 0px 0px 0px',
                          fontFamily: 'sans-serif',
                          fontSize: '14px',
                        }}
                      >
                        You&apos;re all done. Thanks for using SUSI Bot.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ padding: '20px 0 0 40px' }}>
                <br className="display-mobile-only" />
                <h2 className="center">Preview</h2>
                <br />
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <iframe
                    title="botPreview"
                    name="frame-1"
                    id="frame-1"
                    src={locationBot}
                    height="600"
                    width="460"
                  />
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

const styles = {
  home: {
    width: '100%',
  },
  bg: {
    textAlign: 'center',
    padding: '30px',
  },
  paperStyle: {
    width: '100%',
    marginTop: '20px',
  },
  tabStyle: {
    color: 'rgb(91, 91, 91)',
  },
  loggedInError: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '100px',
    fontSize: '50px',
    marginTop: '300px',
  },
};

export default BotWizard;
