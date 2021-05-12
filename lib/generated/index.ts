import { GraphQLClient } from 'graphql-request';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  signupUser?: Maybe<User>;
  deletePost?: Maybe<Post>;
  createDraft?: Maybe<Post>;
  publish?: Maybe<Post>;
};


export type MutationSignupUserArgs = {
  name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId?: Maybe<Scalars['String']>;
};


export type MutationCreateDraftArgs = {
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  authorEmail?: Maybe<Scalars['String']>;
};


export type MutationPublishArgs = {
  postId?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  author?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  feed?: Maybe<Array<Maybe<Post>>>;
  drafts?: Maybe<Array<Maybe<Post>>>;
  filterPosts?: Maybe<Array<Maybe<Post>>>;
};


export type QueryPostArgs = {
  postId: Scalars['String'];
};


export type QueryFilterPostsArgs = {
  searchString?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type CreateDraftMutationMutationVariables = Exact<{
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  authorEmail: Scalars['String'];
}>;


export type CreateDraftMutationMutation = (
  { __typename?: 'Mutation' }
  & { createDraft?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content' | 'published'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'title'>
  )> }
);

export type FeedQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedQuery = (
  { __typename?: 'Query' }
  & { feed?: Maybe<Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content' | 'published'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    )> }
  )>>> }
);


export const CreateDraftMutationDocument = `
    mutation CreateDraftMutation($title: String!, $content: String, $authorEmail: String!) {
  createDraft(title: $title, content: $content, authorEmail: $authorEmail) {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;
export const useCreateDraftMutationMutation = <
      TError = any,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<CreateDraftMutationMutation, TError, CreateDraftMutationMutationVariables, TContext>
    ) => 
    useMutation<CreateDraftMutationMutation, TError, CreateDraftMutationMutationVariables, TContext>(
      (variables?: CreateDraftMutationMutationVariables) => fetcher<CreateDraftMutationMutation, CreateDraftMutationMutationVariables>(client, CreateDraftMutationDocument, variables)(),
      options
    );
export const DeletePostDocument = `
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId) {
    title
  }
}
    `;
export const useDeletePostMutation = <
      TError = any,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>
    ) => 
    useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      (variables?: DeletePostMutationVariables) => fetcher<DeletePostMutation, DeletePostMutationVariables>(client, DeletePostDocument, variables)(),
      options
    );
export const FeedDocument = `
    query Feed {
  feed {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
    `;
export const useFeedQuery = <
      TData = FeedQuery,
      TError = any
    >(
      client: GraphQLClient, 
      variables?: FeedQueryVariables, 
      options?: UseQueryOptions<FeedQuery, TError, TData>
    ) => 
    useQuery<FeedQuery, TError, TData>(
      ['Feed', variables],
      fetcher<FeedQuery, FeedQueryVariables>(client, FeedDocument, variables),
      options
    );