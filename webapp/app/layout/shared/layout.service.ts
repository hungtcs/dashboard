import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, tap } from 'rxjs';

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export interface SlotDefine {
  templateSubject: BehaviorSubject<null | TemplateRef<void>>;
  useUntilSubscription: Subscription | null;
}

export const availableSlots = <const>['header-title', 'header-extra'];

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private slotsMap = new Map<ElementType<typeof availableSlots>, SlotDefine>();

  public get headerTitle() {
    return this.getTemplateSubject('header-title');
  }

  public get headerExtra() {
    return this.getTemplateSubject('header-extra');
  }

  constructor() {
    availableSlots.forEach(slot => {
      this.slotsMap.set(slot, {
        templateSubject: new BehaviorSubject<null | TemplateRef<void>>(null),
        useUntilSubscription: null,
      });
    });
  }

  public useTemplate(slot: ElementType<typeof availableSlots>, template: TemplateRef<void>, useUntil?: Subject<void>) {
    const define = this.slotsMap.get(slot) ?? null;
    if(define === null) {
      throw new Error('unknow slot');
    }
    if(define.useUntilSubscription) {
      define.useUntilSubscription.unsubscribe();
    }
    define.templateSubject.next(template);
    if(useUntil) {
      define.useUntilSubscription = useUntil.pipe(tap(() => define.templateSubject.next(null))).subscribe()
    } else {
      define.useUntilSubscription = null;
    }
  }

  public getTemplateSubject(slotName: ElementType<typeof availableSlots>) {
    const slot = this.slotsMap.get(slotName) ?? null;
    if(slot === null) {
      throw new Error('');
    }
    return slot.templateSubject;
  }

  public useHeaderTitle(template: TemplateRef<void>, useUntil: Subject<void>) {
    this.useTemplate('header-title', template, useUntil);
  }

  public useHeaderExtra(template: TemplateRef<void>, useUntil: Subject<void>) {
    this.useTemplate('header-extra', template, useUntil);
  }

}
