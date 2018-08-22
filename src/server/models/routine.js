const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
  period: {
    // "9:30 AM - 10:10 AM"
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255
  },
  time: {
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    }
  },
  break: {
    isBreak: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      trim: true,
      maxlength: 255
    }
  },
  days: {
    sat: {
      day: {
        type: String,
        trim: true,
        default: 'saturday',
        maxlength: 255
      },
      classes: [
        {
          semester: {
            type: String,
            trim: true,
            maxlength: 255
          },
          subject: {
            title: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 25
            }
          },
          teacher: {
            name: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 20
            },
            guest: {
              type: Boolean,
              default: false
            }
          }
        }
      ]
    },
    sun: {
      day: {
        type: String,
        trim: true,
        default: 'sunday',
        maxlength: 255
      },
      classes: [
        {
          semester: {
            type: String,
            trim: true,
            maxlength: 255
          },
          subject: {
            title: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 25
            }
          },
          teacher: {
            name: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 20
            },
            guest: {
              type: Boolean,
              default: false
            }
          }
        }
      ]
    },
    mon: {
      day: {
        type: String,
        trim: true,
        default: 'monday',
        maxlength: 255
      },
      classes: [
        {
          semester: {
            type: String,
            trim: true,
            maxlength: 255
          },
          subject: {
            title: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 25
            }
          },
          teacher: {
            name: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 20
            },
            guest: {
              type: Boolean,
              default: false
            }
          }
        }
      ]
    },
    tues: {
      day: {
        type: String,
        trim: true,
        default: 'tuesday',
        maxlength: 255
      },
      classes: [
        {
          semester: {
            type: String,
            trim: true,
            maxlength: 255
          },
          subject: {
            title: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 25
            }
          },
          teacher: {
            name: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 20
            },
            guest: {
              type: Boolean,
              default: false
            }
          }
        }
      ]
    },
    wed: {
      day: {
        type: String,
        trim: true,
        default: 'wednesday',
        maxlength: 255
      },
      classes: [
        {
          semester: {
            type: String,
            trim: true,
            maxlength: 255
          },
          subject: {
            title: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 25
            }
          },
          teacher: {
            name: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 20
            },
            guest: {
              type: Boolean,
              default: false
            }
          }
        }
      ]
    },
    thu: {
      day: {
        type: String,
        trim: true,
        default: 'thursday',
        maxlength: 255
      },
      classes: [
        {
          semester: {
            type: String,
            trim: true,
            maxlength: 255
          },
          subject: {
            title: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 25
            }
          },
          teacher: {
            name: {
              type: String,
              trim: true,
              maxlength: 255
            },
            code: {
              type: String,
              trim: true,
              maxlength: 20
            },
            guest: {
              type: Boolean,
              default: false
            }
          }
        }
      ]
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Routine = mongoose.model('routine', RoutineSchema);
