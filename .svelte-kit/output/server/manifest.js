export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.CKIr19UP.js",app:"_app/immutable/entry/app.DdsBHgPY.js",imports:["_app/immutable/entry/start.CKIr19UP.js","_app/immutable/chunks/B6RSQ0Yr.js","_app/immutable/chunks/cwJcEbz3.js","_app/immutable/chunks/B35LU08B.js","_app/immutable/entry/app.DdsBHgPY.js","_app/immutable/chunks/cwJcEbz3.js","_app/immutable/chunks/BRuAYoMK.js","_app/immutable/chunks/BdtiX-M4.js","_app/immutable/chunks/B35LU08B.js","_app/immutable/chunks/CtoAAyi1.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/session/answer",
				pattern: /^\/api\/session\/answer\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/session/answer/_server.ts.js'))
			},
			{
				id: "/api/session/complete",
				pattern: /^\/api\/session\/complete\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/session/complete/_server.ts.js'))
			},
			{
				id: "/api/session/profile",
				pattern: /^\/api\/session\/profile\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/session/profile/_server.ts.js'))
			},
			{
				id: "/api/session/start",
				pattern: /^\/api\/session\/start\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/session/start/_server.ts.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
