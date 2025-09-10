# Context Engineering Examples

**For complete instructions and guidance, see:** [docs/02-context-engineering.md](../../docs/02-context-engineering.md)

This folder contains examples that demonstrate how GitHub Copilot uses surrounding code context, file structure, and workspace organization to provide better suggestions.

## Practice Files

### E-commerce App Example
- `ecommerce-app/` - Structured project showing context influence
- `ecommerce-app/components/ProductCard.jsx` - Component with established patterns
- `ecommerce-app/utils/priceUtils.js` - Utility functions that provide context

### Blog System Example
- `blog-system/` - Multi-file context demonstration
- `blog-system/types.ts` - Type definitions
- `blog-system/api-service.ts` - API service patterns
- `blog-system/PostEditor.jsx` - Component leveraging cross-file context

### Context Examples
- `context-examples.js` - Various context patterns and their influence on suggestions

## Quick Exercise

1. Open multiple files from the same project
2. Notice how suggestions change based on open files
3. Try prompting in different project contexts
4. Experiment with file organization strategies

**Next:** [Copilot Instructions Examples](../copilot-instructions/)