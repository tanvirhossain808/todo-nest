'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const common_1 = require('@nestjs/common');
const jwt_1 = require('@nestjs/jwt');
const bcrypt = __importStar(require('bcrypt'));
const constant_1 = require('../constant/constant');
const user_schemas_1 = require('../schemas/user.schemas');
const mongoose_1 = require('mongoose');
const mongoose_2 = require('@nestjs/mongoose');
let AuthService = class AuthService {
  constructor(userModel, jwtService) {
    this.userModel = userModel;
    this.jwtService = jwtService;
  }
  async login(email, password, res) {
    console.log('Login attempt for:', email);
    console.log(res.cookie('ky', 'value'));
    const user = await this.userModel.findOne({ email: email });
    console.log('User found:', user);
    if (!user) {
      console.log('User not found');
      throw new common_1.UnauthorizedException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Invalid credentials');
      throw new common_1.UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    console.log('JWT Token:', token);
    res.cookie('jwt', `Bearer ${token}`, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });
    console.log('Cookie set successfully');
    return {
      user: {
        id: user._id,
        email: user.email,
      },
    };
  }
  async signout(res) {
    res.clearCookie('jwt', {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
    });
    console.log('Cookie set successfully');
    return { message: 'Sign out successfully' };
  }
  async signup(email, password) {
    const user = await this.userModel.findOne({ email: email });
    if (user)
      throw new common_1.UnauthorizedException('User Already Registered');
    const hashedPassword = await bcrypt.hash(password, constant_1.saltOrRounds);
    const newUser = new this.userModel({ email, password: hashedPassword });
    newUser.save();
    return { user: newUser };
  }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schemas_1.User.name)),
    __metadata('design:paramtypes', [mongoose_1.Model, jwt_1.JwtService]),
  ],
  AuthService,
);
//# sourceMappingURL=auth.service.js.map
