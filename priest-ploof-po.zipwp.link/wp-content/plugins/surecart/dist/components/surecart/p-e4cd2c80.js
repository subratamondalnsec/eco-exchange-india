function i(l, i) {
  return (null == l ? void 0 : l.purchase_limit)
    ? null == l
      ? void 0
      : l.purchase_limit
    : (null == l ? void 0 : l.stock_enabled) &&
      !(null == l ? void 0 : l.allow_out_of_stock_purchases)
    ? i
      ? null == i
        ? void 0
        : i.available_stock
      : null == l
      ? void 0
      : l.available_stock
    : null;
}
export { i as g };
