<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the flower shop as TanStack Start routes with shared React storefront state and localStorage persistence; this preserves the hosted project's fixed runtime while keeping a future backend boundary clear.
- Keep catalog data in one module and product/cart views in shared components; this avoids duplication and keeps filtering and pricing consistent.
