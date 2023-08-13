import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';

const projectKey = 'rsschool-final-task-stage2';

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
        clientId: 'P66qoBIuOqJWW2onJFrF48yi',
        clientSecret: 'hTLk63h_ebHQW2J7J9YeYjmPKwujsvvF',
    },
    scopes: [
        'manage_my_shopping_lists:rsschool-final-task-stage2 view_categories:rsschool-final-task-stage2 manage_my_quotes:rsschool-final-task-stage2 manage_my_payments:rsschool-final-task-stage2 manage_my_business_units:rsschool-final-task-stage2 manage_my_quote_requests:rsschool-final-task-stage2 manage_my_profile:rsschool-final-task-stage2 create_anonymous_token:rsschool-final-task-stage2 view_published_products:rsschool-final-task-stage2 manage_my_orders:rsschool-final-task-stage2',
    ],
});
const httpMiddleware = createHttpMiddleware({
    host: 'https://api.europe-west1.gcp.commercetools.com',
});
const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
});
