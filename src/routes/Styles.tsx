import React from 'react'
import Icon from "../components/Icon"

const Styles = () => {
  return (
    <div className="container columns grid-xxl">
      <article className="buttons column col-6">
        <h2>BUttons</h2>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">default</h3>
          <button className="btn">Base <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-muted">Muted <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-ghost">Ghost <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-outline">OUtline <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
        </section>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">primary</h3>
          <button className="btn btn-primary">Base <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-primary btn-muted">Muted <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-primary btn-ghost">Ghost <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-primary btn-outline">OUtline <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
        </section>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">secondary</h3>
          <button className="btn btn-secondary">Base <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-secondary btn-muted">Muted <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-secondary btn-ghost">Ghost <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-secondary btn-outline">OUtline <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
        </section>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">success</h3>
          <button className="btn btn-success">Base <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-success btn-muted">Muted <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-success btn-ghost">Ghost <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-success btn-outline">OUtline <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
        </section>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">warning</h3>
          <button className="btn btn-warning">Base <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-warning btn-muted">Muted <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-warning btn-ghost">Ghost <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-warning btn-outline">OUtline <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
        </section>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">error</h3>
          <button className="btn btn-error">Base <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-error btn-muted">Muted <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-error btn-ghost">Ghost <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
          <button className="btn btn-error btn-outline">OUtline <Icon className="btn-icon btn-add" size={16} name={"add"} /></button>
        </section>
      </article>
      <article className="chips column col-6">
        <h2>Chips</h2>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">default</h3>
          <button className="chip">Base <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-muted">Muted <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-ghost">Ghost <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-outline">OUtline <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
        </section>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">primary</h3>
          <button className="chip btn-primary">Base <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-primary btn-muted">Muted <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-primary btn-ghost">Ghost <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-primary btn-outline">OUtline <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
        </section>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">secondary</h3>
          <button className="chip btn-secondary">Base <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-secondary btn-muted">Muted <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-secondary btn-ghost">Ghost <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-secondary btn-outline">OUtline <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
        </section>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">success</h3>
          <button className="chip btn-success">Base <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-success btn-muted">Muted <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-success btn-ghost">Ghost <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-success btn-outline">OUtline <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
        </section>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">warning</h3>
          <button className="chip btn-warning">Base <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-warning btn-muted">Muted <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-warning btn-ghost">Ghost <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-warning btn-outline">OUtline <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
        </section>
        <section className="d-flex columns gap-2 p-2 m-2" style={{ gap: "0 1rem" }}>
          <h3 className="col-12 m-0">error</h3>
          <button className="chip btn-error">Base <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-error btn-muted">Muted <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-error btn-ghost">Ghost <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
          <button className="chip btn-error btn-outline">OUtline <Icon className="btn-icon btn-close"  size={16} name={"close"} /></button>
        </section>
      </article>
    </div>
  )
}

export default Styles