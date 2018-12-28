import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

/**
 * Simple container service holding api route definitions.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPrefix = 'api/';
  private apiHost = environment.apiHost + this.apiPrefix;

  public auth = {
    login: (): string => {
      return `${this.apiHost}login`;
    },
    register: (): string => {
      return `${this.apiHost}register`;
    },
    loginRefresh: (): string => {
      return `${this.apiHost}token/refresh`;
    },
    logoutAccess: (): string => {
      return `${this.apiHost}logout/access`;
    },
    logoutRefresh: (): string => {
      return `${this.apiHost}logout/refresh`;
    },
    forgotPassword: (): string => {
      return `${this.apiHost}forgot-password`;
    },
    resetPassword: (): string => {
      return `${this.apiHost}reset-password`;
    }
  };

  public community = {
    getCommunities: (): string => {
      return `${this.apiHost}account/communities`;
    },
    getCommunity: (id: number): string => {
      return `${this.apiHost}communities/${id}`;
    },
    createCommunity: (): string => {
      return `${this.apiHost}communities`;
    },
    renameCommunity: (id: number): string => {
      return `${this.apiHost}communities/${id}`;
    },
    deleteCommunity: (id: number): string => {
      return `${this.apiHost}communities/${id}`;
    },
    getTours: (id: number): string => {
      return `${this.apiHost}communities/${id}/tours`;
    },
    getRefuels: (id: number): string => {
      return `${this.apiHost}communities/${id}/refuels`;
    },
    getPayoffs: (id: number): string => {
      return `${this.apiHost}communities/${id}/payoffs`;
    },
    getTasks: (id: number): string => {
      return `${this.apiHost}communities/${id}/tasks`;
    },
    createRefuel: (id: number): string => {
      return `${this.apiHost}communities/${id}/refuels`;
    },
    getLatestCommunityTour: (id: number): string => {
      return `${this.apiHost}communities/${id}/tours/latest`;
    },
    createTour: (id: number): string => {
      return `${this.apiHost}communities/${id}/tours`;
    },
    getCommunityUsers: (id: number): string => {
      return `${this.apiHost}communities/${id}/users`;
    },
    createPayoff: (id: number): string => {
      return `${this.apiHost}communities/${id}/payoffs`;
    },
    finishTour: (communityId: number, id: number): string => {
      return `${this.apiHost}communities/${communityId}/tours/${id}/finish`;
    },
    forceFinishTour: (communityId: number, id: number): string => {
      return `${this.apiHost}communities/${communityId}/tours/${id}/force-finish`;
    },
    getRunningTours: (id: number): string => {
      return `${this.apiHost}communities/${id}/tours/running`;
    },
    deleteTour: (communityId: number, tourId: number): string => {
      return `${this.apiHost}communities/${communityId}/tours/${tourId}`;
    }
  };

  public payoffs = {
    getPayoff: (id: number): string => {
      return `${this.apiHost}payoffs/${id}`;
    }
  };

  public debts = {
    settleDebt: (id: number): string => {
      return `${this.apiHost}debts/${id}/settle`;
    }
  };

  public communityInvitation = {
    inviteUser: (): string => {
      return `${this.apiHost}communities/invitations`;
    },
    accept: (id: number): string => {
      return `${this.apiHost}communities/invitations/${id}`;
    },
    declineOrDelete: (id: number): string => {
      return `${this.apiHost}communities/invitations/${id}`;
    }
  };

  public user = {
    searchUsers: (query: string): string => {
      return `${this.apiHost}users/search?q=${query}`;
    },
    getInvitedUsers: (communityId: number): string => {
      return `${this.apiHost}communities/${communityId}/users/invited`;
    },
    searchUninvitedUsers: (query: string, communityId: number): string => {
      return `${this.apiHost}users/search?q=${query}&only-uninvited=true&community=${communityId}`;
    }
  };

  public car = {
    createCar: (): string => {
      return `${this.apiHost}cars`;
    }
  };

  public account = {
    getOpenCommunityInvitations: (): string => {
      return `${this.apiHost}account/invitations`;
    },
    changePassword: (): string => {
      return `${this.apiHost}account/change-password`;
    },
    getRunningTours: (): string => {
      return `${this.apiHost}account/tours/running/`;
    }
  };

}
