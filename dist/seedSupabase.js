"use strict";
// Cara pakai:
// 1. Install supabase-js: npm install @supabase/supabase-js
// 2. Set env var SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY (bukan anon key!)
// 3. Jalankan: npx ts-node src/scripts/seedSupabase.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var supabase_js_1 = require("@supabase/supabase-js");
var supabaseUrl = process.env.SUPABASE_URL;
var supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
var supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceRoleKey);
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, services, serviceError, wahaId, n8nId, _b, plans, planError, wahaPlanId, _c, userService, userServiceError, userServiceId, _d, billing, billingError;
        var _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, supabase
                        .from('services')
                        .insert([
                        { slug: 'waha-plus-cloud', name: 'WAHA Plus Cloud', description: 'WA API cloud', category: 'Communication' },
                        { slug: 'n8n', name: 'n8n', description: 'Workflow automation', category: 'Automation' },
                        { slug: 'go-whatsapp', name: 'Go WhatsApp', description: 'Go-based WhatsApp API', category: 'Communication' }
                    ])
                        .select()];
                case 1:
                    _a = _j.sent(), services = _a.data, serviceError = _a.error;
                    if (serviceError)
                        console.error('Service error:', serviceError);
                    wahaId = (_e = services === null || services === void 0 ? void 0 : services.find(function (s) { return s.slug === 'waha-plus-cloud'; })) === null || _e === void 0 ? void 0 : _e.id;
                    n8nId = (_f = services === null || services === void 0 ? void 0 : services.find(function (s) { return s.slug === 'n8n'; })) === null || _f === void 0 ? void 0 : _f.id;
                    return [4 /*yield*/, supabase
                            .from('service_plans')
                            .insert([
                            { service_id: wahaId, name: 'WAHA Plus Cloud (512)', description: '512MB RAM, 0.5 CPU', cpu: 0.5, ram_mb: 512, price: 35000 },
                            { service_id: wahaId, name: 'WAHA Plus Cloud (1G)', description: '1GB RAM, 1 CPU', cpu: 1, ram_mb: 1024, price: 60000 },
                            { service_id: n8nId, name: 'n8n Basic', description: '0.5 CPU, 512MB RAM', cpu: 0.5, ram_mb: 512, price: 15000 }
                        ])
                            .select()];
                case 2:
                    _b = _j.sent(), plans = _b.data, planError = _b.error;
                    if (planError)
                        console.error('Plan error:', planError);
                    wahaPlanId = (_g = plans === null || plans === void 0 ? void 0 : plans.find(function (p) { return p.name === 'WAHA Plus Cloud (512)'; })) === null || _g === void 0 ? void 0 : _g.id;
                    return [4 /*yield*/, supabase
                            .from('user_services')
                            .insert([
                            {
                                user_id: '00000000-0000-0000-0000-000000000000', // Ganti dengan UUID user dari Supabase Auth
                                service_id: wahaId,
                                plan_id: wahaPlanId,
                                name: 'WAHA Bot Customer',
                                billing_cycle: 'monthly',
                                status: 'active',
                                auto_renewal: true,
                                expiry_date: '2024-12-31'
                            }
                        ])
                            .select()];
                case 3:
                    _c = _j.sent(), userService = _c.data, userServiceError = _c.error;
                    if (userServiceError)
                        console.error('UserService error:', userServiceError);
                    userServiceId = (_h = userService === null || userService === void 0 ? void 0 : userService[0]) === null || _h === void 0 ? void 0 : _h.id;
                    return [4 /*yield*/, supabase
                            .from('billing_history')
                            .insert([
                            {
                                user_service_id: userServiceId,
                                amount: 35000,
                                billing_cycle: 'monthly',
                                status: 'paid'
                            }
                        ])];
                case 4:
                    _d = _j.sent(), billing = _d.data, billingError = _d.error;
                    if (billingError)
                        console.error('Billing error:', billingError);
                    // Log hasil
                    console.log({ services: services, plans: plans, userService: userService, billing: billing });
                    return [2 /*return*/];
            }
        });
    });
}
seed();
